﻿
using EohiQuartzService.Quarzt;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Quartz;
using log4net;


namespace EohiQuartzService
{
    public class QuarztHelper
    {
        private static log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public static Quartz.IScheduler scheduler = null;
        public static bool ServiceRunIsTrue { get; set; }



        public static void Stop()
        {
            try
            {
                if (scheduler != null)
                {
                    //if (scheduler.IsStarted)
                    //{
                    scheduler.Shutdown();               
                    ServiceRunIsTrue = false;
                    //}
                }

                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "停止Quartz服务成功！；");
                log.Info(start);


            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "停止Quartz服务失败！；"+exp.Message);
                log.Info(start);
                Console.WriteLine(exp.Message);
                //throw;
            }
        }
        public static void Start()
        {
            try
            {
                if (scheduler != null)
                {
                    if (!scheduler.IsStarted)
                    {
                        scheduler.Start();
                        ServiceRunIsTrue = true;
                    }
                }
                else
                {

                #region 测试.
                var properties = new NameValueCollection();
                //properties["quartz.scheduler.instanceName"] = "RemoteServerSchedulerClient";

                //// 设置线程池
                //properties["quartz.threadPool.type"] = "Quartz.Simpl.SimpleThreadPool, Quartz";
                //properties["quartz.threadPool.threadCount"] = "5";
                //properties["quartz.threadPool.threadPriority"] = "Normal";

                // 远程输出配置
                properties["quartz.scheduler.exporter.type"] = "Quartz.Simpl.RemotingSchedulerExporter, Quartz";
                properties["quartz.scheduler.exporter.port"] = "555";
                properties["quartz.scheduler.exporter.bindName"] = "QuartzScheduler";
                properties["quartz.scheduler.exporter.channelType"] = "tcp";

                var schedulerFactory = new Quartz.Impl.StdSchedulerFactory(properties);
                 scheduler = schedulerFactory.GetScheduler();




                    scheduler.Start();
                    string startm = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "初始化Quartz服务开始运行！；" );
                    log.Info(startm);


              
                }


                #endregion




                #region 原
                //var properties = new NameValueCollection();
                ////properties["quartz.scheduler.instanceName"] = "RemoteServerSchedulerClient";
                ////properties["quartz.scheduler.instanceName"] = "RemoteServerSchedulerClient";
                ////// 设置线程池
                ////properties["quartz.threadPool.type"] = "Quartz.Simpl.SimpleThreadPool, Quartz";
                ////properties["quartz.threadPool.threadCount"] = "5";
                ////properties["quartz.threadPool.threadPriority"] = "Normal";
                //// 远程输出配置
                //properties["quartz.scheduler.exporter.type"] = "Quartz.Simpl.RemotingSchedulerExporter, Quartz";
                //properties["quartz.scheduler.exporter.port"] = "555";
                //properties["quartz.scheduler.exporter.bindName"] = "QuartzScheduler";
                //properties["quartz.scheduler.exporter.channelType"] = "tcp";

                ////scheduler = StdSchedulerFactory.GetDefaultScheduler(properties);
                //var schedulerFactory = new StdSchedulerFactory(properties);
                //scheduler = schedulerFactory.GetScheduler();
                //scheduler.Start(); 
                #endregion
                //
                List<Model_QuartzNetItem> itemList = QuartzNetService.GetList();
                {
                    foreach (Model_QuartzNetItem itm in itemList)
                    {
                        if (itm.Quartzstatus != "启动")
                            continue;

                        if (itm.Jobtype.ToLower() == "http")
                        {
                            HttpJob_Create(itm);
                        }
                    }
                }

                ServiceRunIsTrue = true;

                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "启动Quartz服务成功总有"+itemList.Count+"条任务");
                log.Info(start);

            }
            catch (Exception exp)
            {
                //初始化log4net
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "启动Quartz服务失败:" + exp.Message);
                log.Info(start);
                ServiceRunIsTrue = false;

                Console.WriteLine(exp.Message);
                //throw;
            }
        }




        private static void HttpJob_Create(Model_QuartzNetItem itm)
        {
            try
            {
                Quartz.IJobDetail job = Quartz.JobBuilder.Create<HttpRequestJob>()
               .WithIdentity("job-" + itm.Id.ToString() )
               .WithDescription(itm.Quartzname+"|"+itm.Quartznote)
               .UsingJobData("httpurl", itm.Jobpars)
               .Build();

                //ITrigger trigger = TriggerBuilder.Create()
                //  .WithIdentity("trigger" + itm.Id.ToString(), "triggergroup" + itm.Id.ToString())
                //  .WithSimpleSchedule(t =>
                //    t.WithIntervalInSeconds(5)
                //     .RepeatForever())
                //     .Build();

                Quartz.ITrigger trigger = Quartz.TriggerBuilder.Create()
                                   .WithIdentity("trigger-" + itm.Id.ToString())
                                   .StartNow()
                                   .WithCronSchedule(itm.Crontrigger)    //时间表达式，5秒一次     
                                   .Build();

                //
                scheduler.ScheduleJob(job, trigger);
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "HttpJob_Create方法 Quartz请求任务失败:" + exp.Message);
                log.Info(start);
                //throw;
            }
        }
        private static void HttpJob_Remove(Model_QuartzNetItem itm)
        {
            try
            {
                string jobid = "job-" + itm.Id.ToString();
                string triggerid = "trigger-" + itm.Id.ToString();
                JobKey jobKey = new JobKey(jobid);
                TriggerKey triggerKey = new TriggerKey(triggerid);
                scheduler.PauseJob(jobKey);// 停止触发器  
                scheduler.UnscheduleJob(triggerKey);// 移除触发器  
                scheduler.DeleteJob(jobKey);// 删除任务  
            }
            catch (Exception exp)
            {

                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "HttpJob_Remove方法 删除Quartz请求任务失败:" + exp.Message);
                log.Info(start);
                //throw;
            }
        }

        public static void JoinJob(int jobid)
        {
            try
            {
                Model_QuartzNetItem itm = QuartzNetService.GetById(jobid);
                if (itm == null)
                    return;
                if (itm.Jobtype.ToLower() == "http")
                {
                    if (itm.Quartzstatus == "停止")
                    {
                        //移除
                        HttpJob_Remove(itm);
                    }
                    else
                    {
                        HttpJob_Create(itm);
                    }
                }
               
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "JoinJob方法 JoinJobQuartz请求任务失败:" + exp.Message);
                log.Info(start);
                //throw;
            }
        }
    }
}